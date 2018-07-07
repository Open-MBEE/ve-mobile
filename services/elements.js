export function getExampleElement() {
  return fetch('https://mms.openmbee.org/alfresco/service/projects/PROJECT-84047121-c946-4c0f-bff4-f3aa943900a3/refs/master/elements/_18_5_1_4a9015d_1509122915915_985671_45270', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic b3Blbm1iZWVndWVzdDpndWVzdA==',
    }
  });
}

export function getElement(projectId, elementId) {
  return fetch('https://mms.openmbee.org/alfresco/service/projects/' + projectId + '/refs/master/elements/' + elementId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic b3Blbm1iZWVndWVzdDpndWVzdA==',
    }
  });
}
