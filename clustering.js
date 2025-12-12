// Euclidean distance
function distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.sqrt(dx*dx + dy*dy);
}

// Initialize k random centroids
function initCentroids(points, k) {
    const centroids = [];
    const used = new Set();
    while (centroids.length < k) {
        const idx = Math.floor(Math.random() * points.length);
        if (!used.has(idx)) {
            centroids.push([...points[idx]]);
            used.add(idx);
        }
    }
    return centroids;
}

// Assign points to nearest centroid
function assignClusters(points, centroids) {
    return points.map(p => {
        let minDist = Infinity;
        let cluster = 0;
        centroids.forEach((c, i) => {
            const d = distance(p, c);
            if (d < minDist) {
                minDist = d;
                cluster = i;
            }
        });
        return cluster;
    });
}

// Update centroids
function updateCentroids(points, labels, k) {
    const sums = Array.from({length: k}, () => [0, 0]);
    const counts = Array(k).fill(0);
    points.forEach((p, i) => {
        const l = labels[i];
        sums[l][0] += p[0];
        sums[l][1] += p[1];
        counts[l] += 1;
    });
    return sums.map((s, i) => [s[0]/counts[i], s[1]/counts[i]]);
}

// KMeans main
function kmeans(points, k, iterations = 10) {
    let centroids = initCentroids(points, k);
    let labels = [];
    for (let i=0; i<iterations; i++) {
        labels = assignClusters(points, centroids);
        centroids = updateCentroids(points, labels, k);
    }
    return {centroids, labels};
}

function calculateInertia(points, labels, centroids) {
    let sum = 0;
    points.forEach((p, i) => {
        const c = centroids[labels[i]];
        sum += distance(p, c)**2;
    });
    return sum;
}

// ลอง k = 1..10 และเลือก k ที่ inertia ลดน้อยลง
function findBestK(points, maxK=10) {
    const inertias = [];
    for (let k=1; k<=maxK; k++) {
        const {centroids, labels} = kmeans(points, k, 10);
        inertias.push(calculateInertia(points, labels, centroids));
    }
    // หา elbow แบบง่าย: ค่า inertia ที่ลดน้อยลง
    let bestK = 1;
    for (let i=1; i<inertias.length; i++) {
        if ((inertias[i-1]-inertias[i]) < (inertias[0]*0.1)) { // threshold 10%
            bestK = i;
            break;
        }
    }
    return bestK;
}
