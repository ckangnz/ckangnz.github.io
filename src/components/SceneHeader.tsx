type Props = {
  scene: string;
  title: string;
  kicker?: string;
};

const SceneHeader = ({ scene, title, kicker }: Props) => (
  <header className="scene-header">
    <span className="slate">
      <span className="slate-label">Scene</span>
      <span className="slate-value">{scene}</span>
    </span>
    <div>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
    </div>
  </header>
);

export default SceneHeader;
