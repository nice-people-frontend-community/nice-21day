interface mapTypes {
    [key: string]: string;
}

export const payment_state_map: mapTypes = {
    not_required: '无需缴费',
    unpaid: '未缴费',
    paid: '已缴费',
    refunded: '已退费'
}

export const reached_map: mapTypes = {
    0: '未达标',
    1: '已达标',
}

export const progress_map: mapTypes = {
    registering: '报名中',
    processing: '进行中',
    finished: '已结束',
}
