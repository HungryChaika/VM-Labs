
function GornerScheme(P_previous, x, current_degree, A_elems, delta_P_previous = null, delta_A_elems = null, P_coof = []) {
// base:  Pk = Pk-1 * X + Ak
// delta:  delta(Pk) = delta(Pk-1) * |x| + |Pk-1| * delta(Ak-1)
    --current_degree;
    let P_next = P_previous * x + A_elems[current_degree];
    P_coof.push(P_previous);
    let delta_P_next = null;
    if (delta_P_previous != null || delta_A_elems != null) {
        delta_P_next = delta_P_previous * MyAbs(x) + MyAbs(P_previous) * delta_A_elems[current_degree + 1];
    };
    if (current_degree == 0) {
        return {
            "base": P_next,
            "delta": delta_P_next,
            "p_coof": P_coof
        };
    } else {
        return GornerScheme(P_next, x, current_degree, A_elems, delta_P_next, delta_A_elems, P_coof);
    };
};

function CreatingPolynomialByCoefficients(arr_coof) {
    let answer_poly = "P(x) = ";
    for (i = 0; i < arr_coof.length; i++) {
        answer_poly += `${arr_coof[i]} * x^${arr_coof.length - 1 - i}`;
        if (i !== arr_coof.length - 1) {
            answer_poly += " + ";
        } else {
            answer_poly += " ;";
        };
    };
    return { polynomial: answer_poly };
};

function FindTheRightAndSignificantNumbers({ base, delta }) {
    delta *= 2;
    integer_part_base = Math.trunc(base);
    fractional_part_base = base % 1;
    const arr_digit_integer_base = CreateTheDigitArr(integer_part_base);
    const arr_digit_fractional_base = CreateTheDigitArr(fractional_part_base, false);
    let significant_numbers = [];
    let right_numbers = [];
    let if_find_digit_for_right_numbers = false;
    let ignoring_validation_fractional = false;
    for(let i = arr_digit_fractional_base.length - 1; i >= 0; i--) {
        if(!ignoring_validation_fractional) {
            if(arr_digit_fractional_base[i] != 0) {
                significant_numbers.push(arr_digit_fractional_base[i]);
                ignoring_validation_fractional = true;
            };
        } else {
            significant_numbers.push(arr_digit_fractional_base[i]);
        };
        if(!if_find_digit_for_right_numbers) {
            if_find_digit_for_right_numbers = CheckingDigitForRightNumbers(delta, (i + 1) * (-1));
            if(if_find_digit_for_right_numbers)
            right_numbers.push(arr_digit_fractional_base[i]);
        } else {
            right_numbers.push(arr_digit_fractional_base[i]);
        };
    };
    let ignoring_validation_integer = false;
    let only_zeros_in_fractional = false;
    if(significant_numbers.length == 0) {
        only_zeros_in_fractional = true;
    };
    for(let j = 0; j < arr_digit_integer_base.length; j++) {
        if(only_zeros_in_fractional && !ignoring_validation_integer) {
            if(arr_digit_integer_base[j] != 0) {
                significant_numbers.push(arr_digit_integer_base[j]);
                ignoring_validation_integer = true;
            };
        } else {
            significant_numbers.push(arr_digit_integer_base[j]);
        };
        if(!if_find_digit_for_right_numbers) {
            if_find_digit_for_right_numbers = CheckingDigitForRightNumbers(delta, j);
            if(if_find_digit_for_right_numbers)
            right_numbers.push(arr_digit_integer_base[j]);
        } else {
            right_numbers.push(arr_digit_integer_base[j]);
        };
    };
    const answer_significant = ReverseArray(significant_numbers);
    const answer_right = ReverseArray(right_numbers);
    return {
        significant: answer_significant,
        right: answer_right
    };
};

function CreateTheDigitArr(part_base, its_int = true, digit_coof = [], fractional_precision = fractional_rounding) {
    let elem_digit = 0;
    if(its_int) {
        elem_digit = part_base % 10;
        part_base /= 10;
        digit_coof.push(Math.trunc(elem_digit));
        if(part_base >= 1) {
            return CreateTheDigitArr(part_base, its_int, digit_coof)
        } else {
            return digit_coof;
        };
    } else {
        fractional_precision--;
        part_base *= 10;
        elem_digit = part_base;
        part_base %= 1;
        digit_coof.push(Math.trunc(elem_digit));
        if(fractional_precision == 0) {
            return digit_coof;
        } else {
            return CreateTheDigitArr(part_base, its_int, digit_coof, fractional_precision);
        };
    };
};

function MyAbs(elem) {
    if (elem <= 0) {
        return elem * -1;
    } else {
        return elem;
    };
};

function ReverseArray(arr) {
    let answer = [];
    for(let i = 0; i < arr.length; i++) {
        answer.push(arr[arr.length - 1 - i]);
    };
    return { reverse_array: answer };
};

function CheckingDigitForRightNumbers(delta, digit) {
    let elem = 1;
    if(digit < 0) {
        for(let i = digit; i < 0; i++) {
            elem /= 10;
        };
    } else if(digit > 0) {
        for(let j = 0; j < digit; j++) {
            elem *= 10;
        };
    };
    if(delta < elem) {
        return true;
    } else {
        return false;
    };
};

function FinalCalculations(N) {
    const a0 = 1.234; // ^5
    const a1 = 0.387;
    const a2 = 1.4789;
    const a3 = 1.0098;
    const a4 = 1.222;
    const a5 = -2.345; // ^0
    const x = 0.234 * N;
    const c = 0.987;
    const arr_a_elems = [a5, a4, a3, a2, a1, a0];
    const current_degree = arr_a_elems.length - 1;
    const delta_a0 = 0.001;
    const delta_a5 = 0.0001 * N;
    const arr_delta_a_elems = [delta_a5, 0, 0, 0, 0, delta_a0];

    const Answer_Gorner = GornerScheme(a0, x, current_degree, arr_a_elems, delta_a0, arr_delta_a_elems);
    const Answer_right_and_significant_numbers = FindTheRightAndSignificantNumbers(Answer_Gorner);
    const Answer_dev_poly_by_poly = GornerScheme(a0, c, current_degree, arr_a_elems, delta_a0, arr_delta_a_elems);
    const Answer_polynomial_by_coefficients = CreatingPolynomialByCoefficients(Answer_dev_poly_by_poly.p_coof);

    return {
        Answer_Gorner,
        Answer_right_and_significant_numbers,
        Answer_dev_poly_by_poly,
        Answer_polynomial_by_coefficients
    };
};

const fractional_rounding = 4;

window.onload = () => {
    const value_n = document.getElementById("value_n");
    document.getElementById("enter_value").addEventListener("click", () => {
        if(value_n.value != "" && value_n.value > 0 && value_n.value % 1 == 0) {
            const {
                Answer_Gorner,
                Answer_right_and_significant_numbers,
                Answer_dev_poly_by_poly,
                Answer_polynomial_by_coefficients } = FinalCalculations(value_n.value);
            document.body.innerHTML = ` <h2>Ответы при N = ${value_n.value}<h2><br>
                                <h3>I calculated according to the Gorner scheme:<h3><br>
                                value: ${Answer_Gorner.base}<br>
                                delta: ${Answer_Gorner.delta}<br><br>
                                <h3>I counted the right and significant numbers:<h3><br>
                                right: ${Answer_right_and_significant_numbers.right.reverse_array}<br>
                                significant: ${Answer_right_and_significant_numbers.significant.reverse_array}<br><br>
                                <h3>I the calculated division of a polynomial by a polynomial<h3><br>
                                value: ${Answer_dev_poly_by_poly.base}<br>
                                delta: ${Answer_dev_poly_by_poly.delta}<br>
                                p_coof: ${Answer_dev_poly_by_poly.p_coof}<br><br>
                                <h3>I have written out the equation obtained by dividing a polynomial by a polynomial<h3><br>
                                ${Answer_polynomial_by_coefficients.polynomial}
                                `;
        };
    });
};