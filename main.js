function CholeskyMethod(matr, vect) {
    const p_and_c_matrices = CreateMatricesCholesky(matr);
    const answer = CalcXCholesky(p_and_c_matrices, vect); 
    return answer;
};

function CreateMatricesCholesky(initial_matrix) {
    const p_matrix = [];
    const c_matrix = [];
    for(let i = 0; i < initial_matrix.length; i++) {
        p_matrix.push([]);
        c_matrix.push([]);
        p_matrix[i][0] = initial_matrix[i][0];
        for(let j = 0; j < initial_matrix[i].length; j++) {
            if(i == j) {
                c_matrix[i][j] = 1;
                let elem = 0;
                for(let k = 0; k < j; k++) {
                    elem += p_matrix[i][k] * c_matrix[k][j];
                };
                p_matrix[i][j] = initial_matrix[i][j] - elem;
            } else if( i > j) {
                let elem = 0;
                for(let k = 0; k < j; k++) {
                    elem += p_matrix[i][k] * c_matrix[k][j];
                };
                p_matrix[i][j] = initial_matrix[i][j] - elem;
                c_matrix[i][j] = 0;
            } else {
                let elem = 0;
                for(let k = 0; k < i; k++) {
                    elem += p_matrix[i][k] * c_matrix[k][j];
                };
                c_matrix[i][j] = (initial_matrix[i][j] - elem) / p_matrix[i][i];
                p_matrix[i][j] = 0;
            };
        };
    };
    return { p_matrix, c_matrix };
};

function CalcXCholesky(p_and_c, vect) {
    const y_elems = [];
    y_elems.push(vect[0] / p_and_c.p_matrix[0][0]);
    for(let i = 1; i < vect.length; i++) {
        let elem = 0;
        for(let k = 0; k < i-1; k++) {
            elem += p_and_c.p_matrix[i][k] * y_elems[k];
        };
        y_elems.push((vect[i] - elem) / p_and_c.p_matrix[i][i]);
    };
    const x_elems = [];
    x_elems[vect.length - 1] = y_elems[vect.length - 1];
    for(let i = vect.length - 2; i >= 0; i--) {
        let elem = 0;
        for(let k = i + 1; k < vect.length; k++) {
            elem += p_and_c.c_matrix[i][k] * x_elems[k];
        };
        x_elems[i] = y_elems[i] - elem;
    };
    return x_elems;
};

function SeidelMethod() {

};

/* function MultMatrix(matr_1, matr_2) {
    const answer = [];
    for(let i = 0; i < matr_1.length; i++) {
        answer.push([]);
        for(let j = 0; j < matr_2[i].length; j++) {
            if(answer[i][j] == undefined) {
                answer[i][j] = 0;
            };
            for(let k = 0; k < matr_1.length; k++) {
                answer[i][j] += matr_1[i][k] * matr_2[k][j];
            };
        };
    };
    return answer;
}; */

window.onload = () => { // Матрица и вектор из примера: [[ -4,  1,  1], [  1, -9,  3], [  1,  2, -16]], [2, 5, 13]
    const k = 24; // number of letters in full name
    const m = 4; // number of letters in the name
    const matrix = [[ 12+k , 2     , m/4   , 1    , 2     ],
                    [ 4    , 113+k , 1     , m/10 , m-4   ],
                    [ 1    , 2     , -24-k , 3    , 4     ],
                    [ 1    , 2/m   , 4     , 33+k , 4     ],
                    [ -1   , 2     , -3    , 3+m  , -44-k ],
    ];
    const vect_num = [ 1, 2, 3, 4, 5];
    const answer = CholeskyMethod(matrix, vect_num);
    console.log(answer);
};