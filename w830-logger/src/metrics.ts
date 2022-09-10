import { FastifyInstance } from 'fastify';
import { Registry, Gauge } from 'prom-client'
import { WeatherMetricSnapshot } from './type'


const register = new Registry()

const temperatureGauge = new Gauge({
	name: "temperature",
	help: "Temperature measurements",
	labelNames: ["location", "unit"],
	registers: [register]
})



const humidityGauge = new Gauge({
	name: "humidity",
	help: "Humidity rel",
	labelNames: ["location"],
	registers: [register]
})


const barometerGauge = new Gauge({
	name: "barometer",
	help: "Barometer",
	labelNames: ["location", "type"],
	registers: [register]
})

const windSpeedGauge = new Gauge({
	name: "wind_speed",
	help: "The speed of the wind",
	labelNames: ["unit"],
	registers: [register]
})

const windDirectionGauge = new Gauge({
	name: "wind_direction",
	help: "The direction wind",
	labelNames: [],
	registers: [register]
})

const uvGauge = new Gauge({
	name: "UV",
	help: "The UV radiation index",
	labelNames: [],
	registers: [register]
})


const solarRadiationGauge = new Gauge({
	name: "solar_radiation",
	help: "The solar radiation",
	labelNames: [],
	registers: [register]
})



export const addSnapshot = (snapshot: WeatherMetricSnapshot) => {
	temperatureGauge.set({ location: "inside", unit: "c" }, snapshot.tempInC)
	temperatureGauge.set({ location: "outside", unit: "c" }, snapshot.tempC)

	humidityGauge.set({ location: "outside" }, snapshot.humidity)
	humidityGauge.set({ location: "inside" }, snapshot.humidityIn)

	barometerGauge.set({ type: "absolute", location: "inside" }, snapshot.baromAbsIn)
	barometerGauge.set({ type: "relative", location: "inside" }, snapshot.baromRelIn)

	windSpeedGauge.set({ unit: "ms" }, snapshot.windSpeedMs)
	windDirectionGauge.set(snapshot.windDir)
	uvGauge.set(snapshot.UV)
	solarRadiationGauge.set(snapshot.solarRadiation)


	// TODO: CREATE THESE
	// rainRateIn: convertToNumber(rawSnapshot.rainratein),
	// hourlyRainIn: convertToNumber(rawSnapshot.hourlyrainin),
	// dailyRainIn: convertToNumber(rawSnapshot.dailyrainin),
	// weeklyRainIn: convertToNumber(rawSnapshot.weeklyrainin),
	// monthlyRainIn: convertToNumber(rawSnapshot.monthlyrainin),
	// eventRainIn: convertToNumber(rawSnapshot.eventrainin),
	// totalRainIn: convertToNumber(rawSnapshot.totalrainin),
	// windGustMs: convertMphToMs(Number(rawSnapshot.windgustmph)),
	// maxDailyGust: convertMphToMs(Number(rawSnapshot.maxdailygust)),
}


export async function plugin(fastify: FastifyInstance) {
	fastify.get("/metrics", {}, async (request, reply) => {
		fastify.log.info("hitting metrics");

		reply.header("Content-Type", register.contentType)
		const metrics = await register.metrics()

		reply.send(metrics)
	});
}
