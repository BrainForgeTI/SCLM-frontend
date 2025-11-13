import { apiAuth } from "@/lib/api-manager";
import { useSessionStore } from "@/store/session-store";

export async function getMetrics() {
  const user = useSessionStore.getState().id;
  // return (await apiAuth.get(`/users/insights/${user}`)).data
  return {
  "insights": [
    "Hora com mais eventos 'mission.concluded': 15:00 (42 ocorrências)",
    "Maior pico de atividade na quarta-feira",
    "Você aumentou seu ritmo em relação à semana passada! 🚀 Excelente progresso!"
  ],
  "graph": [
    {
      "labels": ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
      "datasets": [
        {
          "label": "Domingo",
          "data": [1,0,0,0,0,1,2,4,6,8,10,12,9,7,6,5,4,3,2,2,1,1,0,0]
        },
        {
          "label": "Segunda",
          "data": [0,0,0,1,2,5,10,18,22,25,30,33,35,37,40,42,38,35,30,20,15,10,5,2]
        },
        {
          "label": "Terça",
          "data": [0,0,0,0,2,6,12,20,25,28,32,35,38,40,42,39,36,33,28,22,16,8,4,1]
        },
        {
          "label": "Quarta",
          "data": [0,0,0,0,3,7,14,22,27,31,35,38,40,42,44,42,38,35,30,25,18,12,6,2]
        },
        {
          "label": "Quinta",
          "data": [0,0,0,0,2,6,11,18,23,27,30,34,37,39,41,40,36,32,28,20,14,8,4,1]
        },
        {
          "label": "Sexta",
          "data": [0,0,0,0,1,4,8,15,20,25,30,34,36,38,40,38,34,30,25,18,12,6,3,1]
        },
        {
          "label": "Sábado",
          "data": [0,0,0,0,1,2,4,6,10,12,15,18,20,19,17,14,12,10,8,5,3,2,1,0]
        }
      ]
    },
    {
      "labels": ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],
      "datasets": [
        {
          "label": "Semana Atual",
          "data": [5,10,9,11,8,10,4],
          "borderColor": "rgba(54, 162, 235, 1)",
          "backgroundColor": "rgba(54, 162, 235, 0.2)",
          "fill": true
        },
        {
          "label": "Semana Anterior",
          "data": [11,4,3,6,7,10,9],
          "borderColor": "rgba(255, 99, 132, 1)",
          "backgroundColor": "rgba(255, 99, 132, 0.2)",
          "fill": true
        }
      ]
    },
    {
      "labels": ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
      "datasets": [
        {
          "label": "Missões concluídas",
          "data": [2,5,3,7,1,2,3],
          "backgroundColor": [
            "rgba(75, 192, 192, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(201, 203, 207, 0.8)"
          ]
        }
      ]
    }
  ]
}

}
