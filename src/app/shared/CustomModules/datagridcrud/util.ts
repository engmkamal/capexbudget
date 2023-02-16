export class Utils {
    static transposeData(rows: any[], headerProperty: string) {
      if (rows.length === 0) throw new Error('No rows available');
  
      const firstRow = rows[0];
  
      const properties = Object.keys(firstRow);
  
      return properties
        .filter(pty => pty !== 'name')
        .map(pty => {
          const obj = {};
          obj['name'] = pty;
          rows.forEach(row => {
            obj[row[headerProperty]] = row[pty];
          });
  
          return obj;
        });
    }
  }