// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {prisma} from "../../../utils/prisma"

export default function handler(req, res) {
    const reminder = prisma.reminder.create({
      data: {
        title: req.body.title,
        rendu: req.body.date,
        desc: req.body.desc,
        color: req.body.color,
        idG: req.body.group
      },
    })
    res.send(reminder)
  }
  