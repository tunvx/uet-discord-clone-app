import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import mongoose, { ObjectId, Document } from 'mongoose';
import { Message } from 'src/messages/schemas';
import { User } from 'src/users/schemas';

export type ChatChannelDocument = ChatChannel & Document;

@Schema({ timestamps: true })
export class ChatChannel {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @ApiProperty({ required: true })
  @Prop()
  name: string;

  @ApiProperty({ required: false })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  @Type(() => User)
  members: string[] = [];

  @ApiProperty({ required: false })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  })
  @Type(() => Message)
  messages: string[] = [];
}
export const ChatChannelSchema = SchemaFactory.createForClass(ChatChannel);
