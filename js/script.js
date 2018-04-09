
const $students = $('.student-item'); //could add li here?
const $studentSearch = $('.student-search');
const $pagination = $('.pagination');
const $studentList = pages($students);

//========================================//
function pages(listOfStudents) {
  let prevList = listOfStudents.slice();
  let pagesArray = [];
  while (prevList.length) {
    pagesArray.push(prevList.splice(0,10));
  }
  return pagesArray;
}
//========================================//
function showPage(pageNumber, pageList) {
  $('.student-list li').hide();
  $.each(pageList, function(index, page) {
    if(pageNumber === index) {
      $.each(page, function(i, listItem){
        $(listItem).fadeIn('fast');
      });
    }
  });

}

//========================================//
function appendButtons(pageList) {
  $('.page').append($pagination)
  let numOfPages = pageList.length;
  for (let i = 1; i <= numOfPages; i++){
    let buttons = '<li><a href="#">' + i + '</a></li>'
    $('.pagination ul li a').append(buttons);
  }

  $('.pagination ul li a').on('click', function(event){
    let pageSelect = parseInt($(this)[0].text) - 1;
    showPage(pageSelect, pageList);
      $('.pagination ul li a').removeClass();
      $(this).addClass('active');
      event.preventDefault();
  });

}
//========================================//
function searchList () {
  let searchIt = $('#search').val().toLowerCase().trim();
    let filterStudents = $students.filter(function(i){
    let studentEmail = $(this).find('.email').text();
    let studentName = $(this).find('h3').text();
    if (studentName.indexOf(searchIt) > -1 || studentEmail.indexOf(serachIt) > -1){
      return true;
    }
    else {
      return false;
    }
  });
  if (filterStudents.length === 0) {
    $('.page-header h2').text('No Result(s)');
  }
  else {
    $('.page-header h2').text('STUDENTS');
  }
  let paginatedStudents = pages(filterStudents);
    $('.pagination').remove();
    if (filterStudents >= 10) {
      appendButtons(paginatedStudents);
    }
    showPage(0, paginatedStudents);
}

//========================================//
appendButtons($studentList);
showPage(0, $studentList);

//========================================//
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);
