const fs = require('fs');
const path = require('path');

const files = [
  'src/screens/DashboardScreen/DashboardScreen.tsx',
  'src/screens/CoursesScreen/CoursesScreen.tsx',
  'src/screens/RemedialLearningScreen/RemedialLearningScreen.tsx',
  'src/screens/AIFacultyScreen/AIFacultyScreen.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove Colors from import
  content = content.replace(/Colors,\s*/g, '');
  content = content.replace(/, Colors/g, '');

  // 2. Add useTheme import
  if (!content.includes('useTheme')) {
    content = content.replace(/import \{ Header \} from '..\/..\/components';/, "import { Header } from '../../components';\nimport { useTheme } from '../../store/ThemeContext';");
  }

  // 3. For components () => ( ... )
  content = content.replace(/const (\w+) = \(\) => \(\n((?:.|\n)*?)\n\);/g, (match, name, body) => {
    return `const ${name} = () => {\n  const { colors } = useTheme();\n  const styles = get${name}Styles(colors);\n  return (\n${body}\n  );\n};`;
  });
  
  // For components () => { ... }
  content = content.replace(/const (\w+) = \(\) => \{\n/g, (match, name) => {
    return `const ${name} = () => {\n  const { colors } = useTheme();\n  const styles = getStyles(colors);\n`;
  });
  
  // 4. Transform StyleSheet.create
  content = content.replace(/const (\w+)Styles = StyleSheet\.create\(\{/g, 'const get$1Styles = (colors: any) => StyleSheet.create({');
  content = content.replace(/const styles = StyleSheet\.create\(\{/g, 'const getStyles = (colors: any) => StyleSheet.create({');

  // 5. Replace Colors. with colors.
  content = content.replace(/Colors\./g, 'colors.');

  // 6. Fix references (some subcomponents might reference other style objects)
  content = content.replace(/levelStyles\./g, 'styles.');
  content = content.replace(/sparksStyles\./g, 'styles.');
  content = content.replace(/calStyles\./g, 'styles.');
  content = content.replace(/questStyles\./g, 'styles.');
  content = content.replace(/statsStyles\./g, 'styles.');
  
  content = content.replace(/courseStyles\./g, 'styles.');
  content = content.replace(/topicStyles\./g, 'styles.');
  content = content.replace(/progressStyles\./g, 'styles.');
  
  content = content.replace(/weaknessStyles\./g, 'styles.');
  content = content.replace(/pathStyles\./g, 'styles.');
  
  content = content.replace(/msgStyles\./g, 'styles.');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(file, 'transformed successfully.');
});
