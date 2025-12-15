function computeCentroids(points, labels, k) {
    const sums = Array.from({ length: k }, () => [0, 0]);
    const counts = Array(k).fill(0);

    points.forEach((p, i) => {
        const c = labels[i];
        if (c === -1) return; // ignore noise
        sums[c - 1][0] += p[0];
        sums[c - 1][1] += p[1];
        counts[c - 1]++;
    });

    return sums.map((s, i) => [
        s[0] / counts[i],
        s[1] / counts[i]
    ]);
}

function haversine(a, b) {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;

    const dLat = toRad(b[1] - a[1]);
    const dLon = toRad(b[0] - a[0]);

    const lat1 = toRad(a[1]);
    const lat2 = toRad(b[1]);

    const h =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;

    return 2 * R * Math.asin(Math.sqrt(h));
}

function dbscan(points, eps = 300, minPts = 5) {
    const labels = Array(points.length).fill(undefined);
    let clusterId = 0;

    function regionQuery(i) {
        return points
            .map((p, j) => haversine(points[i], p) <= eps ? j : -1)
            .filter(j => j !== -1);
    }

    function expandCluster(i, neighbors) {
        labels[i] = clusterId;
        for (let k = 0; k < neighbors.length; k++) {
            const j = neighbors[k];
            if (labels[j] === undefined) {
                labels[j] = clusterId;
                const n2 = regionQuery(j);
                if (n2.length >= minPts) {
                    neighbors.push(...n2);
                }
            }
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (labels[i] !== undefined) continue;

        const neighbors = regionQuery(i);
        if (neighbors.length < minPts) {
            labels[i] = -1; // noise
        } else {
            clusterId++;
            expandCluster(i, neighbors);
        }
    }

    return { labels, clusters: clusterId };
}
