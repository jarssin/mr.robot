import { object, string, mixed, number } from "yup";

const SendSchema = object({
  phone: string().required(),
  msg: string().required(),
  idCampaign: number().notRequired(),
  file: mixed().notRequired(),
});

interface SendData {
  phone: string;
  msg: string;
  idCampaign?: number;
  file?: Express.Multer.File;
}

export class SendDto {
  constructor(
    public phone: string,
    public msg: string,
    public idCampaign?: number,
    public file?: Express.Multer.File
  ) { }

  static from(data: SendData) {
    const { phone, msg, idCampaign, file } = SendSchema.validateSync(data);
    return new SendDto(phone, msg, idCampaign, file);
  }
}
