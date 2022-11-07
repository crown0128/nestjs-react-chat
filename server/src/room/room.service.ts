import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  getRooms() {
    return this.roomRepository.find();
  }

  getRoom(id: number) {
    return this.roomRepository.findOneBy({ id });
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    await this.roomRepository.save(room);
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto) {
    const result = await this.roomRepository.update(id, updateRoomDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }

  async deleteRoom(id: number) {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }
}
