/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = function(res, err){
    var r = {
        result: res
    };

    if(err) r.fault = { faultCode: 0, faultMessage: err, localizedMessages: [{'pt-BR':'sdasdasda'}] };

    return r;
};