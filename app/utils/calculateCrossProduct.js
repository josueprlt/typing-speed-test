export default function (minScore, maxScore) {
    const crossProduct = minScore * 100 / maxScore;

    if (crossProduct > 100) return 100;
    return Math.round(crossProduct);
}