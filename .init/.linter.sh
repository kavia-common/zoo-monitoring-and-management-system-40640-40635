#!/bin/bash
cd /home/kavia/workspace/code-generation/zoo-monitoring-and-management-system-40640-40635/zoo_monitoring_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

