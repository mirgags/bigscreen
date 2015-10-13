function carousel() {
    theDiv = $("div:visible");
    theNextDiv = theDiv.next();
    console.log(theDiv.get(0));
    console.log(theNextDiv.get(0));
    theDiv.fadeOut("slow", "linear");
    theNextDiv.fadeIn("slow", "linear");
/*    $("div:visible").next( function() {
        $("div:visible").fadeToggle("slow", "linear");
        $(this).fadeToggle("slow", "linear");
    });
*/
    console.log('ending fade?');
};
window.setInterval(carousel, 5000);
