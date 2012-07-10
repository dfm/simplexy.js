window.simplexy = (function () {

    var i, x, y, A, AT, X, Y, X2, Y2, XY, simplexy = {};

    i = 0;
    X = []; Y = []; X2 = []; Y2 = []; XY = [];
    for (x = -1; x <= 1; x++) {
        for (y = -1; y <= 1; y++) {
            X[i] = x;
            Y[i] = y;
            X2[i] = x * x;
            Y2[i] = y * y;
            XY[i] = x * y;
            i++;
        }
    }

    A = $M([[1, 1, 1, 1, 1, 1, 1, 1, 1], X, Y, X2, XY, Y2]);
    AT = A.transpose();

    simplexy.ATAinvA = AT.x(A).inv().x(AT).transpose();

    simplexy.simplexy = function (img) {
        var i, j, results, a, b, c, d, e, f, patch = [], xc, yc;
        if (img.length !== 3 && img[0].length !== 3)
            throw "patch's got to be 3x3";
        for (i = 0; i < 3; i++)
            for (j = 0; j < 3; j++)
                patch.push(img[i][j]);

        patch = $V(patch);
        results = simplexy.ATAinvA.multiply(patch);
        console.log(results);

        a = results.elements[0];
        b = results.elements[1];
        c = results.elements[2];
        d = results.elements[3];
        e = results.elements[4];
        f = results.elements[5];

        xc = (2.0 * c * d + e * b) / (e * e - 4 * f * d);
        yc = (2.0 * b * f + e * c) / (e * e - 4 * f * d);

        return [xc, yc];
    };

    return simplexy;

})();
