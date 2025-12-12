import { AccountRoutes } from "@services/api/AccountApi";
import { ContractRoutes } from "@services/api/ContractApi";
import { LeaveRoutes } from "@services/api/LeaveApi";
import { PlannedClockRoutes } from "@services/api/PlannedClockApi";
import { RecordedClockRoutes } from "@services/api/RecordedClockApi";
import { ScheduleRoutes } from "@services/api/ScheduleApi";
import { SessionRoutes } from "@services/api/SessionApi";
import { TeamRoutes } from "@services/api/TeamApi";
import { TeamMemberRoutes } from "@services/api/TeamMemberApi";
import { UserRoutes } from "@services/api/UserApi";
import { VerificationRoutes } from "@services/api/VerificationApi";
import { WorkRoutes } from "@services/api/WorkApi";

export type Routes<Input> = AccountRoutes<Input> &
    ContractRoutes<Input> &
    LeaveRoutes<Input> &
    PlannedClockRoutes<Input> &
    RecordedClockRoutes<Input> &
    ScheduleRoutes<Input> &
    SessionRoutes<Input> &
    TeamRoutes<Input> &
    TeamMemberRoutes<Input> &
    UserRoutes<Input> &
    VerificationRoutes<Input> &
    WorkRoutes<Input>;
