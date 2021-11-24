import { PARAM_ORDER, PARAM_SORT, PARAM_SITE, PARAM_FILTER } from ".";
import { CreateMethod } from "../utils";


export interface IStackParams {
    page: number
    pagesize: number
    order: PARAM_ORDER
    sort: PARAM_SORT
    site: PARAM_SITE
    filter: PARAM_FILTER
}

const create: CreateMethod<IStackParams> = (args) => ({
    page: args?.page ?? 1,
    pagesize: args?.pagesize ?? 100,
    order: args?.order ?? PARAM_ORDER.desc,
    sort: args?.sort ?? PARAM_SORT.activity,
    site: args?.site ?? PARAM_SITE.stackoverflow,
    filter: args?.filter ?? PARAM_FILTER.shallow,
})

export const StackParams = {
    create
}
