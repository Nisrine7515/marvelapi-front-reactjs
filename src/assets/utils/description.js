export function getDescription(description) {
  if (!description || description.trim() === "") {
    return "Ce personnage n’a pas encore de description. Tu peux en ajouter une !";
  }
  return description;
}
