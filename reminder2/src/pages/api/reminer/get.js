import {prisma} from "../../../utils/prisma"

export default async function get_remind(req, res) {
    
    const value = await prisma.Remind.findMany()

    //a filtrer en fonction des acces de l'utilisateur

    return res.status(200).json({ value });
  }