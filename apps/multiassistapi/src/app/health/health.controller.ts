import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get('health')
  Health() {
    return { status: 'ok' }
  }
}
