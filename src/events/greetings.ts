import { Whatsapp } from "venom-bot";

import { buttons } from "./";

import logger from "../utils/logger";

const INTRODUCTION = `Olá, me chamo Mr Robot, sou um robô de propaganda com foco em publicidade via Whatsapp.

Comigo você pode cadastrar contatos e ultilizar minha base de números para enviar mensagens simultâneas. Como aquela promoção que você não sabe como irá divulgar para seus clientes!`;

const QUESTION = "Deseja receber mensagens com mais detalhes?";

export const greetings = (client: Whatsapp, to: string) => {
  // client
  //   .sendButtons(
  //     to,
  //     INTRODUCTION,
  //     // buttons,
  //     QUESTION
  //   )
  //   .then((msg) => logger.success("Message sended", msg))
  //   .catch((error) => logger.error("Error: ", error));
};
