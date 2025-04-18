function showText(code) {
    const texts = {
      '1-meio_ambiente': `
        <p><strong>Meio Ambiente:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      `,
      '2-educacao': `
        <p><strong>Educação</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
      `,
      '3-construcao': `
        <p><strong>Construção:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
      `,
      '4-orgaos_publicos': `
        <p><strong>Órgãos Públicos:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
      `,
      '5-animais': `
        <p><strong>Animais:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
      `,
      '6-preservacao': `
        <p><strong>Preservação:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti..</p>
      `
    };

    const display = document.getElementById('displayText');
    display.innerHTML = texts[code] || '<p>Conteúdo não encontrado.</p>';
  }