// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth"
import prisma from "../auth/prisma"

const session = await getServerSession();


export default async function handler(req, res) {
  const group = await prisma.group.create({
    data: {
      name: req.body.name,
      desc: req.body.desc,
    },
  })
  const useringroup = await prisma.useringroup.create({
    data:{
      groupId: group.id,
      userId: session.user.id
    }
  })
  res.send(group, useringroup)
}
