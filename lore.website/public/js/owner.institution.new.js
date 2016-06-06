/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    $('a.new-campus').click(function(){
        var ic = $('input:regex(name,campus\\[[0-9]\\]\\[name\\])').length;
        $('ul.campus-list').append();
    });
    
    $('a.new-building').click(function(){
        alert();
    });
});