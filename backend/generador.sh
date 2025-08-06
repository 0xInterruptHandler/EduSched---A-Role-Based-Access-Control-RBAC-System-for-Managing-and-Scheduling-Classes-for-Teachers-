#!/bin/bash

# ========== CONFIGURACIÓN DE COLORES ==========
RESET="\033[0m"
BOLD="\033[1m"
BLUE="\033[1;34m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
CYAN="\033[1;36m"
GRAY="\033[0;37m"

# ========== FUNCIÓN: TÍTULO ==========
function mostrar_titulo() {
  clear
  echo -e "${CYAN}"
  echo "=========================================="
  echo "   GENERADOR DE ESTRUCTURA DE PROYECTO"
  echo "=========================================="
  echo -e "${RESET}"
}

# ========== FUNCIÓN: INPUT ==========
function prompt_input() {
  local mensaje=$1
  echo -en "${BLUE}${mensaje}${RESET} "
}

# ========== FUNCIÓN: MENSAJE DE SISTEMA ==========
function mensaje_sistema() {
  local mensaje=$1
  echo -e "${GREEN}${mensaje}${RESET}"
}

# ========== FUNCIÓN: ERROR ==========
function mensaje_error() {
  local mensaje=$1
  echo -e "${RED}${mensaje}${RESET}"
}

# ========== FUNCIÓN PRINCIPAL ==========
function generar_estructura() {
  while true; do
    prompt_input "Nombre del directorio (o escribe 'salir' para finalizar):"
    read dir_name

    if [[ "$dir_name" == "salir" ]]; then
      mensaje_sistema "Proceso finalizado."
      break
    fi

    # Validar nombre
    if [[ -z "$dir_name" ]]; then
      mensaje_error "El nombre del directorio no puede estar vacío."
      continue
    fi

    mkdir -p "$dir_name"
    mensaje_sistema "Directorio '$dir_name' creado."

    cd "$dir_name" || exit

    # Archivos dentro del directorio
    while true; do
      prompt_input "¿Deseas crear un archivo dentro de '$dir_name'? (${YELLOW}si${RESET}/${YELLOW}no${RESET}):"
      read respuesta

      case "$respuesta" in
        si|SI|Si)
          prompt_input "Nombre del archivo (con extensión, ej: index.js):"
          read file_name
          if [[ -z "$file_name" ]]; then
            mensaje_error "Nombre de archivo no válido."
            continue
          fi
          touch "$file_name"
          mensaje_sistema "Archivo '$file_name' creado."
          ;;
        no|NO|No)
          mensaje_sistema "Finalizando creación de archivos en '$dir_name'."
          break
          ;;
        *)
          mensaje_error "Respuesta inválida. Usa 'si' o 'no'."
          ;;
      esac
    done

    cd ..
  done
}

# ========== EJECUCIÓN ==========
mostrar_titulo
generar_estructura

