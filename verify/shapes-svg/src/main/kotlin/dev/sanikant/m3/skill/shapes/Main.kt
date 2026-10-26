package dev.sanikant.m3.skill.shapes

import androidx.graphics.shapes.Cubic
import androidx.graphics.shapes.Morph
import androidx.graphics.shapes.RoundedPolygon
import java.io.File
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.exp
import kotlin.math.roundToInt
import kotlin.math.sin
import kotlin.math.sqrt

/** The 35 MaterialShapes in the order material3 declares them. */
private val shapes: List<Pair<String, RoundedPolygon>> = with(MaterialShapePolygons) {
    listOf(
        "Circle" to circle(), "Square" to square(), "Slanted" to slanted(), "Arch" to arch(),
        "Fan" to fan(), "Arrow" to arrow(), "SemiCircle" to semiCircle(), "Oval" to oval(),
        "Pill" to pill(), "Triangle" to triangle(), "Diamond" to diamond(), "ClamShell" to clamShell(),
        "Pentagon" to pentagon(), "Gem" to gem(), "Sunny" to sunny(), "VerySunny" to verySunny(),
        "Cookie4Sided" to cookie4(), "Cookie6Sided" to cookie6(), "Cookie7Sided" to cookie7(),
        "Cookie9Sided" to cookie9(), "Cookie12Sided" to cookie12(), "Ghostish" to ghostish(),
        "Clover4Leaf" to clover4(), "Clover8Leaf" to clover8(), "Burst" to burst(),
        "SoftBurst" to softBurst(), "Boom" to boom(), "SoftBoom" to softBoom(), "Flower" to flower(),
        "Puffy" to puffy(), "PuffyDiamond" to puffyDiamond(), "PixelCircle" to pixelCircle(),
        "PixelTriangle" to pixelTriangle(), "Bun" to bun(), "Heart" to heart(),
    ).map { (name, polygon) -> name to polygon.normalized() }
}

/** LoadingIndicatorDefaults.IndeterminateIndicatorPolygons in 1.5.0-beta02, cycled in order. */
private val loadingCycle = listOf("SoftBurst", "Cookie9Sided", "Pentagon", "Pill", "Sunny", "Cookie4Sided", "Oval")

/** Expressive and standard MotionScheme springs (damping ratio, stiffness) from the material3 tokens. */
private val springs = mapOf(
    "expressive-fast-spatial" to (0.6f to 800f),
    "expressive-default-spatial" to (0.8f to 380f),
    "expressive-slow-spatial" to (0.8f to 200f),
    "standard-fast-spatial" to (0.9f to 1400f),
    "standard-default-spatial" to (0.9f to 700f),
    "standard-slow-spatial" to (0.9f to 300f),
    "fast-effects" to (1f to 3800f),
    "default-effects" to (1f to 1600f),
    "slow-effects" to (1f to 800f),
)

private fun Float.fmt(): String {
    val r = (this * 100).roundToInt() / 100f
    return if (r == r.toInt().toFloat()) r.toInt().toString() else r.toString()
}

/** SVG path in a 0..100 box. */
private fun List<Cubic>.svgPath(): String = buildString {
    val s = 100f
    val start = this@svgPath.first()
    append("M${(start.anchor0X * s).fmt()} ${(start.anchor0Y * s).fmt()}")
    for (c in this@svgPath) {
        append("C${(c.control0X * s).fmt()} ${(c.control0Y * s).fmt()} ")
        append("${(c.control1X * s).fmt()} ${(c.control1Y * s).fmt()} ")
        append("${(c.anchor1X * s).fmt()} ${(c.anchor1Y * s).fmt()}")
    }
    append("Z")
}

/**
 * Position of a unit-mass spring from 0 to 1 at time [t] (seconds), the same model Compose's
 * spring() uses. Returns null once it has settled.
 */
private fun springCurve(damping: Float, stiffness: Float): List<Float> {
    val w0 = sqrt(stiffness.toDouble())
    val z = damping.toDouble()
    fun x(t: Double): Double = if (z < 1) {
        val wd = w0 * sqrt(1 - z * z)
        1 - exp(-z * w0 * t) * (cos(wd * t) + (z * w0 / wd) * sin(wd * t))
    } else {
        1 - exp(-w0 * t) * (1 + w0 * t)
    }
    // Settle when within 0.1% for the rest of the curve.
    var end = 0.05
    while (end < 3.0 && (abs(x(end) - 1) > 0.001 || abs(x(end + 0.05) - 1) > 0.001)) end += 0.01
    return (0..40).map { x(end * it / 40).toFloat() } + listOf(end.toFloat())
}

private fun String.q() = "\"$this\""

fun main(args: Array<String>) {
    // Gradle runs this from verify/shapes-svg/, so the default lands in the site project.
    val out = File(args.firstOrNull() ?: "../../site/src/data/shapes.json")
    val byName = shapes.toMap()
    val json = buildString {
        append("{\n  \"source\": \"androidx.compose.material3 1.5.0-beta02 MaterialShapes, rendered with androidx.graphics:graphics-shapes 1.1.0\",\n")
        append("  \"shapes\": [\n")
        append(shapes.joinToString(",\n") { (name, p) -> "    {\"name\": ${name.q()}, \"path\": ${p.cubics.svgPath().q()}}" })
        append("\n  ],\n  \"loading\": [\n")
        val pairs = loadingCycle.indices.map { loadingCycle[it] to loadingCycle[(it + 1) % loadingCycle.size] }
        append(pairs.joinToString(",\n") { (a, b) ->
            val morph = Morph(byName.getValue(a), byName.getValue(b))
            val frames = (0..24).map { morph.asCubics(it / 24f).svgPath().q() }
            "    {\"from\": ${a.q()}, \"to\": ${b.q()}, \"frames\": [${frames.joinToString(", ")}]}"
        })
        append("\n  ],\n  \"springs\": {\n")
        append(springs.entries.joinToString(",\n") { (name, ds) ->
            val curve = springCurve(ds.first, ds.second)
            val ms = (curve.last() * 1000).roundToInt()
            val points = curve.dropLast(1).joinToString(", ") { ((it * 1000).roundToInt() / 1000f).toString() }
            "    ${name.q()}: {\"damping\": ${ds.first}, \"stiffness\": ${ds.second}, \"ms\": $ms, \"linear\": \"linear($points)\"}"
        })
        append("\n  }\n}\n")
    }
    out.parentFile?.mkdirs()
    out.writeText(json)
    println("wrote ${shapes.size} shapes, ${loadingCycle.size} morphs, ${springs.size} springs to ${out.path}")
}
