/* eslint-disable */

const backHost = '/ShuiLi.S.190115/'
// const backHost = '/'

export const getVoteList = function (params) {
    // params = { 'OpenID': OpenID, "NickName": $.cookie("wb_nickname"), "HeadImg": $.cookie("wb_headimg") }
    return new Promise((resolve, reject) => {
        $.post(backHost + "CommonHelper.ashx?Method=Check", params,
            function (result) {
                if (result != "-1") {
                    let entity = JSON.parse(result);
                    resolve(entity)
                }
                else {
                    Go("", "1");
                }
            });
    })
}


export const getOpenID = function (params) {
    return new Promise(resolve => {
        $.post(backHost + "CommonHelper.ashx?Method=GetOpenID", params,
            function (result) {
                if (result != "-1") {
                    let entity = JSON.parse(result);
                    resolve(entity)
                }
                else {
                    Go("", "1");
                }
            });
    })
}

export const postVote = function (params) {
    // params = { 'OpenID': OpenID, 'VoteIDList': VoteIDList }
    return new Promise(resolve => {
        $.post(backHost + "CommonHelper.ashx?Method=Vote", params,
            function (result) {
                if (result != "-1") {
                    var entity = JSON.parse(result);
                    resolve(entity)
                }
                else {
                    Go("", "1");
                }
            });
    })
}

export const getRankList = function () {
    return new Promise(resolve => {
        $.post(backHost + "CommonHelper.ashx?Method=List", {},
            function (result) {
                if (result != "") {
                    var entity = JSON.parse(result);
                    resolve(entity)
                    // $.each(entity, function (index, obj) {
                    //     var Order = index + 1;
                    //     var Name = obj.Name;
                    // })
                }
            });
    })
}


export const lottery = function (params) {
    // params = { 'OpenID': OpenID }
    return new Promise(resolve => {
        $.post(backHost + "CommonHelper.ashx?Method=Lottery", params,
            function (result) {
                debugger
                if (result != "-1") {

                    resolve(result)
                }
                else {
                    Go("", "1");
                }
            });
    })
}

export const saveInfo = function (params) {
    // params = { 'OpenID': OpenID, 'Phone': Phone, 'Name': Name }
    return new Promise(resolve => {
        $.post(backHost + "CommonHelper.ashx?Method=Save", params,
            function (result) {
                if (result != "-1") {
                    var entity = JSON.parse(result);

                    var Status = entity[0].Status;

                    resolve(Status)
                    if (Status == 1) {
                        //报名成功
                    }
                    else if (Status == 0) {
                        // alert("该电话号码已经使用过");
                    }
                    else {
                        // alert("您已经报过名，请勿重复参与！");
                        Go("", "1");
                    }
                }
                else {
                    Go("", "1");
                }
            });
    })
}