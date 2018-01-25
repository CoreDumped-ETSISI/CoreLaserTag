module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost/laserTag',
  damage: process.env.DAMAGE || 10,
  pointsPerShot: process.env.POINTSPERSHOT || 10
}
