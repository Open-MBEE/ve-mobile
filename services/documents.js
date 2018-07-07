export function getDocuments(projectId) {
  return fetch('https://mms.openmbee.org/alfresco/service/projects/' + projectId + '/refs/master/documents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic b3Blbm1iZWVndWVzdDpndWVzdA==',
    }
  });
}

export function getViewDocumentationRecursively(projectId, viewId) {

  // if view does not have children
  //   return view's documentation
  // else
  //   buffer view's documentation
  //   for each child of view
  //     buffer getViewDocumentationRecursively(child)
  //   return buffer

  return fetch('https://mms.openmbee.org/alfresco/service/projects/' + projectId + '/refs/master/elements/' + viewId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic b3Blbm1iZWVndWVzdDpndWVzdA==',
    }
  })
  .then(res => res.json())
  .then(data => {
    if (!data.elements || !data.elements[0]) {
      return '';
    }

    let view = data.elements[0];

    if (view._childViews.length < 1) {
      return view.documentation
    } else {
      let buffer = view.documentation;

      view._childViews.map(childViewObject => {
        buffer += getViewDocumentationRecursively(projectId, childViewObject.id);
      });

      console.log(buffer)
      return buffer;
    }
  });
}
