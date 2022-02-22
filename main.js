const k = 24; // number of letters in full name
const m = 4; // number of letters in the name
const matrix = [
    [ 12+k , 2     , m/4   , 1    , 2     ],
    [ 4    , 113+k , 1     , m/10 , m-4   ],
    [ 1    , 2     , -24-k , 3    , 4     ],
    [ 1    , 2/m   , 4     , 33+k , 4     ],
    [ -1   , 2     , -3    , 3+m  , -44-k ],
];
//const matrix_width = matrix[0].length;
//const matrix_height = matrix.length;
const vect_num = [ 1, 2, 3, 4, 5];

function CholeskyMethod() {
    const p_and_c_matrices = CreateMatricesCholesky(matrix);
    return p_and_c_matrices;
};

function SeidelMethod() {

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

function MultMatrix(matr_1, matr_2) {
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
};

window.onload = () => {

    //const elem = CreateMatricesCholesky(matrix);
    //const elem = MultMatrix([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
    console.log(elem);

};