$(function() {
    $.get('/blocks', appendToList);

    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();

        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData,
            success: function(blockName) {
                appendToList([blockName]);
                form.trigger('reset');
            }
        })
    });

    $('.block-list').on('click', 'a[data-block]', function(event) {
      console.log("clicked");
      if(!confirm('Are you sure?')) {
        return false;
      }

      var target = $(event.currentTarget);

      $.ajax({
        type: 'DELETE',
        url: '/blocks/'+target.data('block')
      }).done(function() {
        target.parents('li').remove();
      })
    });

    function appendToList(blocks) {
        console.log(blocks);
        var list = [];
        for(var i in blocks) {
            block = blocks[i];
            content = '<a href="/blocks/'+block+'">'+block+'</a>' + '<a href="#" data-block="' + block + '"><p>Delete</p></a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
});
