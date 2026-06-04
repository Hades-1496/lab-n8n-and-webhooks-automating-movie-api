const { Router } = require('express')
const router = Router()
const pool = require('../config/db')

// GET /api/admin/webhooks
// Devuelve todos los registros de webhook_eventos con paginación
router.get('/webhooks', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await pool.query(
      'SELECT * FROM webhook_eventos ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )

    const countResult = await pool.query('SELECT COUNT(*) FROM webhook_eventos')
    const total = parseInt(countResult.rows[0].count)

    res.json({
      ok: true,
      eventos: result.rows,
      paginacion: {
        total,
        pagina: page,
        paginas: Math.ceil(total / limit)
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router