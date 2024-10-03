import * as rst from "../types/result";

type ResponseData = { code: number, msg: string };
type ValidationFunction<T> = (param: T) => rst.Result<T, ResponseData>

const validate = <T>(
    body: any,
    validationFuncs: [ValidationFunction<T>, ...ValidationFunction<T>[]] // At least one function!
): rst.Result<T, ResponseData> => {
    if (!body)
        return rst.Err({ code: 400, msg: "Body cannot be empty!" });

    const data = body as rst.Defined<T>;
    
    for (let func of validationFuncs) {
        const result = func(data);
        if (!result.ok) return rst.Err(result.error);
    }

    return rst.Ok(data);
}

export { ResponseData, validate };