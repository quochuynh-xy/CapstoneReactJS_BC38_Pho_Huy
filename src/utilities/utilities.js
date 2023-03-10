export const loadBackUpIMg = () => {
    
}
export const formatCurrency = (value, split = ".", decimal = ",", unit = "") => {
    const string = Number(1000.2).toLocaleString().split("");
    const defaultSplit = string[1];
    const defaultDecimal = string[5];
    let formatedValue = value.toLocaleString();
    const [before_0, after_0 = ""] = formatedValue.split(defaultDecimal)
    if (!after_0) {
        return before_0.replaceAll(defaultSplit, split) + unit;
    } else {
        return before_0.replaceAll(defaultSplit, split) + decimal + after_0 + unit;
    }
}