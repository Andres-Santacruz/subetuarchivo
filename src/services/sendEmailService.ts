// import { getTokenAndTransport } from "../config/nodeMailer";

import { transporter } from "../config/nodeMailer";


export const sendEmail =  async (email: string, code: string): Promise<void> => {
  /* const transporter  = await getTokenAndTransport();
  if(!transporter) throw new Error('no se pudo enviar email');
  console.log('lleque aqui'); */

  try {
    await transporter.sendMail({
      from: '"CODIGO de verificación" <subetuarchivo@hotmail.com>',
      to: email,
      subject: "Código de verificación para subier archivos",
      html: `
        <h1>Código de verificación </h1>
        <p>Utiliza este código " <b><h2>${code}</h2></b> " para continuar subiendo tu archivo</p>
      `,
    });
  } catch (error: any) {
    console.log('error: ', error.message);
  }
  
}