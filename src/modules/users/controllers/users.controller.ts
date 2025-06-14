import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UsersService } from '../providers'
import { LoginDto, ShareDto } from '../dto'
import { ContactsDto } from '../dto/contacts.dto'

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('notifications')
  async getNotifications(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('User ID is required')
    }
    return this.usersService.getNotifications(userId)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.integration)
  }

  @Post('share')
  async share(@Body() shareDto: ShareDto) {
    return this.usersService.shareInformation(
      shareDto.brightId,
      shareDto.contactInfo,
    )
  }

  @Post('query-contacts')
  async queryContacts(@Body() contactsDto: ContactsDto) {
    return this.usersService.queryContacts(contactsDto.contacts)
  }
}
