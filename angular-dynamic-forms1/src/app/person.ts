export const person = {
   

host: {
    label: 'Host',
   // value: 'Juri',
    type: 'text',
    validation: {
      required: true
    }
  },
  port: {
    label: 'Port',
   // value: 32,
    type: 'text',
    validation: {
      required: true
    }
  },

  username: {
      label: 'Username',
     // value: 32,
      type: 'text',
      validation: {
        required: true
      }
    },
  
    password: {
      label: 'Password',
     // value: 32,
      type: 'text',
      validation: {
        required: true
      }
    },
    
  scheme: {
    label: 'Scheme',
   // value: '39010',
    type: 'select',
    options: [
      { label: 'HTTP', value: 'http' },
      { label: 'SNMP', value: 'snmp' }
    ],
    validation: {
      required: true
    }


}



    // "components": {
    //   "database": {
    //     "title": "Database",
    //     "fields": [
    //       {
    //         "name": "host",
    //         "title": "Host",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "port",
    //         "title": "Port",
    //         "type": "integer",
    //         "required": true
    //       },
    //       {
    //         "name": "username",
    //         "title": "Username",
    //         "type": "string"
    //       },
    //       {
    //         "name": "password",
    //         "title": "Password",
    //         "type": "password"
    //       }
    //     ]
    //   },
    //   "nso": {
    //     "title": "NSO",
    //     "fields": [
    //       {
    //         "name": "scheme",
    //         "title": "Scheme",
    //         "type": "dropdown",
    //         "required": true,
    //         "options": [
    //           {
    //             "http": "HTTP"
    //           },
    //           {
    //             "https": "HTTPS"
    //           }
    //         ]
    //       },
    //       {
    //         "name": "host",
    //         "title": "Host",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "port",
    //         "title": "Port",
    //         "type": "integer",
    //         "required": true
    //       },
    //       {
    //         "name": "username",
    //         "title": "Username",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "password",
    //         "title": "Password",
    //         "type": "password",
    //         "required": true
    //       }
    //     ]
    //   },
    //   "camunda": {
    //     "title": "Camunda",
    //     "fields": [
    //       {
    //         "name": "scheme",
    //         "title": "Scheme",
    //         "type": "dropdown",
    //         "options": [
    //           {
    //             "http": "HTTP"
    //           },
    //           {
    //             "https": "HTTPS"
    //           }
    //         ]
    //       },
    //       {
    //         "name": "host",
    //         "title": "Host",
    //         "type": "string"
    //       },
    //       {
    //         "name": "port",
    //         "title": "Port",
    //         "type": "integer",
    //         "hidden": true
    //       },
    //       {
    //         "name": "username",
    //         "title": "Username",
    //         "type": "string"
    //       },
    //       {
    //         "name": "password",
    //         "title": "Password",
    //         "type": "password"
    //       }
    //     ]
    //   },
    //   "log": {
    //     "title": "Log",
    //     "fields": [
    //       {
    //         "name": "directory",
    //         "title": "Directory",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "systemLogFile",
    //         "title": "System Log File",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "auditLogFile",
    //         "title": "Audit Log File",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "logLevel",
    //         "title": "Log Level",
    //         "type": "dropdown",
    //         "widget": "select",
    //         "options": [
    //           {
    //             "debug": "Debug"
    //           },
    //           {
    //             "error": "Error"
    //           },
    //           {
    //             "info": "Info"
    //           },
    //           {
    //             "warning": "Warning"
    //           }
    //         ],
    //         "required": true
    //       }
    //     ]
    //   }
    // }
  

};

