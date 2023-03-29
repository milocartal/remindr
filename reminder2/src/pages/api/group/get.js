import prisma from "../../../utils/prisma"

export default async function get_group(req, res) {
    //const session = await getServerSession(req, res, authOptions)
    var id_group = req.body.id_group;
    
    const value = await prisma.Group.findUnique({
      where: {
        id: id_group
      }
    })

    //a filtrer en fonction des acces de l'utilisateur

    return res.status(200).json({ value });
  }