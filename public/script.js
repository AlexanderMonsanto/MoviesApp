$(function(){

$('.delete').on('click', function(event){
  event.preventDefault();
  // alert('button clicked ' + $(this).data('id'));
  var deleteButton = $(this);

  $.ajax({
    url:'/favorites/' + deleteButton.data('id'),
    type: 'DELETE',
    success:function(data){
      deleteButton.closest('li').fadeOut(2500);
    }
  })
})

$('.favsubmit').on('click', function(event){
  event.preventDefault();
  var addButton = $(this);
  $.post('/favorites', {
    movie_title: addButton.data('title'),
    movie_year: addButton.data('year'),
    movie_image: addButton.data('image'),
    movie_imbdID: addButton.data('imbdid')
  },function(data){
    alert('info added');
    $('.favsubmit').fadeOut(2500);

  })
})

})


