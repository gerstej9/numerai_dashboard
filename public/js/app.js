'use strict';


const userStatus = $('.userNot').attr('id');
const newUserStatus = $('.userDoes').attr('id');


function hideUserStatus(){
  if (userStatus !== 'no'){
    $('#user-not').hide();
  }
  if(newUserStatus !== 'yes'){
    $('#user-does').hide();
  }
}

function deleteModelCollection(event){
  event.preventDefault();
  const collectionName = $('#collectionName').val();
  let LSmodels = localStorage.getItem('collections');
  let modelCollections = JSON.parse(LSmodels);
  let targetIndex = modelCollections.findIndex(i => i.collectionName === collectionName);
  if(targetIndex >=0){
    modelCollections.splice(targetIndex, 1);
    localStorage.setItem('collections', JSON.stringify(modelCollections));
    $('.existing-collections').html('');
    $('#collectionName').val('');
    $('#modelList').html('');
    renderModelCollectionNames();
    $('#detailPage').find('input').remove();
  }
}

function saveModelCollection(event){
  if(event){
    event.preventDefault();
  }
  // const model = $('#model').val();
  const collectionName = $('#collectionName').val();
  if(collectionName){
    const models = [];
    $( '.modelArray' ).find('h2').each(function() {
      models.push($(this).text());
    });
    let LSmodels = localStorage.getItem('collections');
    let modelCollections = JSON.parse(LSmodels);
    if(modelCollections === null){
      modelCollections = [];
    }
    let targetIndex = modelCollections.findIndex(i => i.collectionName === collectionName);
    if(targetIndex >=0){
      modelCollections[targetIndex].modelCollection = models;
    }else{
      modelCollections.push({collectionName: collectionName, modelCollection:models});
    }
    localStorage.setItem('collections', JSON.stringify(modelCollections));
    $('.existing-collections').html('');
    renderModelCollectionNames();
  }
}

function addModel(){
  const modelToAdd = $('#model-to-add').val();
  $('#modelList').append($(`<li class = "modelArray"><h2>${modelToAdd}</h2><img class = "removeModels" src = "https://p.kindpng.com/picc/s/19-191468_png-file-svg-minus-sign-icon-transparent-png.png"></li>`));
  $('#detailButton').before(`<input type = "hidden" name = "model" value = "${modelToAdd}"></input>`);
  $('.removeModels').on('click', deleteModel);
  $('#addModel').prop('checked', false);
  $('#model-to-add').val('');
  changeFormAction();
  saveModelCollection();
}

function renderModelCollectionNames(){
  let LSmodels = localStorage.getItem('collections');
  let modelCollections = JSON.parse(LSmodels);
  // $('.existing-collections').append(template);
  if(modelCollections !== null){
    modelCollections.forEach(collection => {
      // let template = $('#collectionTemplate').html();
      // let collectionTag = template.find('h2');
      // // collectionTag.find('h2').text(collection.collectionName);
      // $('.existing-collections').append(collectionTag);
      $('.existing-collections').append(`<li><h2 class = "collections">${collection.collectionName}</h2></li>`);
    });
  }
  $('.removeCollection').on('click', deleteModel);
  $('.collections').on('click', renderExistingCollectionModels);
}

function renderExistingCollectionModels(){
  $('#detailPage').find('input').remove();
  $('#modelList').html('');
  const collectionToRetrieve = $(this).text();
  const LSmodels = localStorage.getItem('collections');
  const modelCollections = JSON.parse(LSmodels);
  // console.log(collectionToRetrieve);
  // console.log(modelCollections);
  $('#collectionName').val(`${collectionToRetrieve}`);
  const targetCollection = modelCollections.filter(collection => collection.collectionName === collectionToRetrieve);
  const models = targetCollection[0].modelCollection;
  models.forEach(model => {
    $('#modelList').append($(`<li class = "modelArray"><h2>${model}</h2><img class = "removeModels" src = "https://p.kindpng.com/picc/s/19-191468_png-file-svg-minus-sign-icon-transparent-png.png"></li>`));
    $('.removeModels').on('click', deleteModel);
    $('#addModel').prop('checked', false);
    $('#model-to-add').val('');
    $('#detailButton').before(`<input type = "hidden" name = "model" value = "${model}"></input>`);
  });
  changeFormAction();
}

function changeFormAction(){
  $('#detailPage').attr('action', '/detail/'+ $('#collectionName').val());
}

function deleteModel(){
  const parentHtml = $(this).parent();
  const modelToRemove = parentHtml.find('h2').html();
  $(this).parent().html('');
  $( `input[value|='${modelToRemove}']` ).remove();
  saveModelCollection();
}

function newCollection(){
  $('#detailPage').find('input').remove();
  $('#modelList').html('');
  $('#collectionName').val('');
}

function modelNotFound(){
  const modelFoundUser = $('#modelExistsUser').val();
  const modelFound = $('#modelFound').val();
  if(modelFound !== 'false'){
    const LSmodels = localStorage.getItem('collections');
    const modelCollections = JSON.parse(LSmodels);
    $('#collectionName').val(`${modelFoundUser}`);
    const targetCollection = modelCollections.filter(collection => collection.collectionName === modelFoundUser);
    const models = targetCollection[0].modelCollection;
    models.forEach(model => {
      if(model === modelFound){
        $('#modelList').append($(`<li class = "modelArray"><h2>${model}</h2><h3>(Model Not Found)</h3><img class = "removeModels" src = "https://p.kindpng.com/picc/s/19-191468_png-file-svg-minus-sign-icon-transparent-png.png"></li>`));
      }else{
        $('#modelList').append($(`<li class = "modelArray"><h2>${model}</h2><img class = "removeModels" src = "https://p.kindpng.com/picc/s/19-191468_png-file-svg-minus-sign-icon-transparent-png.png"></li>`));
      }
      $('.removeModels').on('click', deleteModel);
      $('#addModel').prop('checked', false);
      $('#model-to-add').val('');
      $('#detailButton').before(`<input type = "hidden" name = "model" value = "${model}"></input>`);
    });
    changeFormAction();
  }
}


modelNotFound();
$('#addModel').change(addModel);
// $('#newCollection').on('submit',createModelCollection);
$('#saveCollection').on('click', saveModelCollection);
$('#deleteCollection').on('click', deleteModelCollection);
hideUserStatus();
renderModelCollectionNames();
$('#addModel').hide();
$('#newCollectionButton').on('click', newCollection);



//TODO prevent repeat names in local storage for collection names

// $('#detailPage').find('input').remove()

// $('#detailPage').attr('action', '/detail/'+ $('#collectionName').val())

// $( "li" ).find('h2').each(function() {
//   console.log($( this ).text() );
// });


//  $('#collectionName').val(`${collectionToRetrieve}`);
// const targetCollection = modelCollections.filter(collection => collection.collectionName === collectionToRetrieve);
// const models = targetCollection[0].modelCollection;
// models.forEach(model => {
//   $('#modelList').append($(`<li class = "modelArray"><h2>${model}</h2><img class = "removeModels" src = "https://p.kindpng.com/picc/s/19-191468_png-file-svg-minus-sign-icon-transparent-png.png"></li>`));
//   $('.removeModels').on('click', deleteModel);
//   $('#addModel').prop('checked', false);
//   $('#model-to-add').val('');
//   $('#detailButton').before(`<input type = "hidden" name = "model" value = "${model}"></input>`);
// });
// changeFormAction();
// }