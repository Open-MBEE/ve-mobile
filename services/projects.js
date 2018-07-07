export function getAllProjects() {
  return fetch('https://mms.openmbee.org/alfresco/service/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic b3Blbm1iZWVndWVzdDpndWVzdA==',
    }
  });
}
