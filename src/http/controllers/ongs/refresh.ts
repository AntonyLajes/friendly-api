import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({
            onlyCookie: true
        })

        const token  = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d'
            }
        })

        reply
            .setCookie(
                'refreshToken', refreshToken, {
                    path: '/',
                    sameSite: true,
                    httpOnly: true,
                    secure: true
                }
            )
            .status(200)
            .send({
                token
            })
    } catch (error) {
        reply.status(401).send({
            message: 'Invalid or expired refresh token.'
        })
    }
}