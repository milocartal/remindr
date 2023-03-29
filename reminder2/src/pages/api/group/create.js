// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth"
import {prisma} from "../../../utils/prisma"

export default async function handler(req, res) {
  const session = await getServerSession();
  const group = await prisma.group.create({
    data: {
      name: req.body.name,
      desc: req.body.desc,
    },
  })
  /*const useringroup = await prisma.useringroup.create({
    data:{
      groupId: group.id,
      userId: session.user.id
    }
  })*/
  //res.send(group, useringroup)
  console.log("Create Group")
  res.send(200).json({message:"Group create"})
}
