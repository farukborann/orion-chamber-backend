import { Injectable } from '@nestjs/common';
import {
  Process,
  ProcessStatus,
  TeamMember,
  CreditPeriod,
} from '@prisma/client';
import { PrismaService } from './prisma.service';

export interface CreditCheckResult {
  hasCredit: boolean;
  message: string;
  remainingTeamCredits?: number;
  remainingUserCredits?: number;
}

@Injectable()
export class CreditService {
  constructor(private readonly prisma: PrismaService) {}

  async checkCreditAvailability(
    userID: string,
    teamID: string,
    requiredCredits: number,
  ): Promise<CreditCheckResult> {
    // Get team information
    const team = await this.prisma.team.findUnique({
      where: { id: teamID },
    });

    if (!team) {
      return {
        hasCredit: false,
        message: 'Team not found',
      };
    }

    // Check team's total credits
    if (team.totalCredits < requiredCredits) {
      return {
        hasCredit: false,
        message: 'Insufficient team credits',
        remainingTeamCredits: team.totalCredits,
      };
    }

    // Get user's team membership
    const teamMember = await this.prisma.teamMember.findFirst({
      where: {
        teamID,
        userID,
        deletedAt: null, // Soft delete check
      },
    });

    if (!teamMember) {
      return {
        hasCredit: false,
        message: 'User is not a team member',
      };
    }

    // Check user's credit limit if not unlimited (0 means unlimited)
    if (teamMember.maxCredit > 0) {
      const usedCredits = await this.getUserUsedCredits(
        userID,
        teamID,
        teamMember.creditPeriod,
      );

      if (usedCredits + requiredCredits > teamMember.maxCredit) {
        return {
          hasCredit: false,
          message: 'User credit limit exceeded',
          remainingUserCredits: teamMember.maxCredit - usedCredits,
        };
      }
    }

    return {
      hasCredit: true,
      message: 'Credit available',
      remainingTeamCredits: team.totalCredits,
      remainingUserCredits:
        teamMember.maxCredit > 0
          ? teamMember.maxCredit -
            (await this.getUserUsedCredits(
              userID,
              teamID,
              teamMember.creditPeriod,
            ))
          : undefined,
    };
  }

  private async getUserUsedCredits(
    userID: string,
    teamID: string,
    creditPeriod: CreditPeriod,
  ): Promise<number> {
    // Calculate the start date based on credit period
    const now = new Date();
    let startDate: Date;

    if (creditPeriod === CreditPeriod.WEEKLY) {
      // Start of current week (Monday)
      startDate = new Date(now);
      const dayOfWeek = startDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate.setDate(startDate.getDate() - daysToMonday);
      startDate.setHours(0, 0, 0, 0);
    } else {
      // Start of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get completed processes in the period
    const completedProcesses = await this.prisma.process.findMany({
      where: {
        userID,
        teamID,
        status: ProcessStatus.COMPLETED,
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        credit: true,
      },
    });

    return completedProcesses.reduce(
      (total, process) => total + process.credit,
      0,
    );
  }

  async deductCredits(
    userID: string,
    teamID: string,
    creditsToDeduct: number,
  ): Promise<void> {
    // Deduct from team's total credits
    await this.prisma.team.update({
      where: { id: teamID },
      data: {
        totalCredits: {
          decrement: creditsToDeduct,
        },
      },
    });
  }
}
