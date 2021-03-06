import jade from 'jade';
import dialog from './dialog';
import * as utils from './utilities';
import { format_incident, navigate_to_detail } from './IncidentDetail';

export function init_incident_alert(socket, incident) {
  fetch('/static/views/IncidentAlert.jade').then(response => response.text())
    .then(htmlstring => {
    const _dialog = document.querySelector('#incident-alert');

    if (_dialog) {
      _dialog.parentNode.removeChild(_dialog);
    }

    document.querySelector('#main').insertAdjacentHTML('afterend', jade.render(htmlstring, {incident: format_incident(incident)}));
    componentHandler.upgradeAllRegistered();

    const dialog = document.querySelector('#incident-alert');

    dialog.MaterialDialog.show(true);

    document.querySelector('#subscribe-incident-button').addEventListener('click', () => {
      utils.subscribe_to_incident(socket, incident);
      navigate_to_detail(socket, incident);
      close_dialog();
    });

    document.querySelector('#dismiss-alert-button').addEventListener('click', close_dialog);
  });
}

function close_dialog() {
  const dialog = document.querySelector('#incident-alert');
  dialog.MaterialDialog.close();
}
