{{- define "book-shelf-charts.fullname" -}}
{{ printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "book-shelf-charts.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "login.fullname" -}}
{{ printf "%s-%s" .Release.Name "login" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "login.labels" -}}
app.kubernetes.io/name: "login"
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "frontend.fullname" -}}
{{ printf "%s-%s" .Release.Name "frontend" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "frontend.labels" -}}
app.kubernetes.io/name: "frontend"
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}


{{- define "books-database.fullname" -}}
{{ printf "%s-%s" .Release.Name "books-database" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "books-database.labels" -}}
app.kubernetes.io/name: "books-database"
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
