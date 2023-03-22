// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../auth/prisma"

export default async function handler(req, res) {
  const useringroup = await prisma.useringroup.create({
    data:{
      groupId: req.body.idG,
      userId: req.body.idU
    }
  })
  res.send(useringroup)
}
